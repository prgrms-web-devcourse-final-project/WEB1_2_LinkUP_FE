describe('상품 상세 페이지 테스트', () => {
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

    // 메인 페이지에서 제품 목록 페이지로 이동
    cy.get('[data-testid="more-button"]').first().click();
    cy.url().should('include', '/products');

    // 첫 번째 상품 선택
    cy.get('[data-testid="product-item"]').first().click();
    cy.url().should('match', /\/products\/\d+/);
  });

  it('제품 상세 페이지 요소 체크', () => {
    cy.get('[data-testid="product-image"]').should('be.visible');
    cy.get('[data-testid="product-title"]').should('be.visible');
    cy.get('[data-testid="product-price"]').should('be.visible');
    cy.get('[data-testid="product-description"]').should('be.visible');
  });

  it('수량 조절이 동작해야 함', () => {
    // 수량 선택
    cy.get('[data-testid="quantity-input"]').type('{uparrow}');
    cy.get('[data-testid="quantity-input"]').type('{uparrow}');
    cy.get('[data-testid="quantity-input"]').type('{downarrow}');
    cy.get('[data-testid="quantity-input"]').should('have.value', '2');
  });

  it('찜 추가 버튼이 동작해야 함', () => {
    cy.get('[data-testid="wish-button"]').should('be.visible');
    cy.get('[data-testid="wish-button"]').click();
  });

  it('댓글 섹션이 표시되어야 함', () => {
    cy.get('[data-testid="comment-component"]').should('be.visible');
  });
});
