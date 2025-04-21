/// <reference types="cypress" />

describe('상품 주문 테스트', () => {
  const email = 'test12@test.test';
  const password = 'Ttest1234!';

  beforeEach(() => {
    // 로그인
    cy.visit('http://localhost:5173/signin');
    cy.get('input[placeholder="이메일 입력"]').type(email);
    cy.get(
      'input[placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"]'
    ).type(password);
    cy.contains('Login').click();
    cy.url().should('include', '/');
  });

  it('상품 주문 전체 프로세스 테스트', () => {
    // 메인 페이지에서 상품 목록 페이지로 이동
    cy.get('[data-testid="more-button"]').first().click();
    cy.url().should('include', '/products');

    // 첫 번째 상품 선택
    cy.get('[data-testid="product-item"]').first().click();
    cy.url().should('match', /\/products\/\d+/);

    // 수량 선택
    cy.get('[data-testid="quantity-input"]').type('{uparrow}'); // 수량 증가
    cy.get('[data-testid="quantity-input"]').should('have.value', '2');

    // 구매하기 버튼 클릭
    cy.get('[data-testid="buy-now"]').click();
    cy.url().should('match', /\/products\/payment\/\d+/);

    // 배송 정보 입력
    const address = {
      name: '홍길동',
      address: '서울시 강남구',
      detail: '101호',
      needed: '부재시 문앞에 놓아주세요',
    };

    cy.get('[data-testid="name"]').type(address.name);

    // 주소 검색 팝업 실행
    cy.get('[data-testid="address"]').click();
    // 주소 검색 팝업이 열리면 주소 입력
    cy.window().then((win) => {
      win.postMessage(
        {
          type: 'daum.postcode',
          data: {
            address: address.address,
          },
        },
        '*'
      );
    });

    cy.get('[data-testid="detail"]').type(address.detail);
    cy.get('[data-testid="needed"]').type(address.needed);

    // 결제 수단 선택
    cy.get('[data-testid="card"]').click();

    // 결제하기 버튼 클릭
    cy.get('[data-testid="submit"]').click();
  });
});
