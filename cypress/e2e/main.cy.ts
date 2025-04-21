describe('메인 페이지 테스트', () => {
  const email = 'test12@test.test';
  const password = 'Ttest1234!';

  beforeEach(() => {
    cy.visit('http://localhost:5173/signin');

    cy.get('input[placeholder="이메일 입력"]').type(email);
    cy.get(
      'input[placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"]'
    ).type(password);

    cy.contains('Login').click();

    // 로그인 후 메인 페이지로 이동
    cy.url().should('include', '/');
  });

  it('메인 페이지의 주요 컨테이너들이 표시되어야 함', () => {
    // ContainerBox들이 표시되는지 확인
    cy.get('[data-testid="container-box"]').should('have.length', 3);
  });

  it('인기 상품(할인율이 가장 높은 상품)이 표시되어야 함', () => {
    // PopularProduct 컴포넌트가 표시되는지 확인
    cy.get('[data-testid="popular-product"]').should('be.visible');
    // 링크가 올바른 형식을 가지고 있는지 확인
    cy.get('[data-testid="popular-product"]')
      .should('have.attr', 'href')
      .and('include', '/products/');
  });

  it('추천 상품 목록이 표시되어야 함', () => {
    // RecommendProduct 컴포넌트가 표시되는지 확인
    cy.get('[data-testid="recommend-product"]').should('be.visible');
  });

  it('카테고리별 상품이 표시되어야 함', () => {
    // CategoryProduct 컴포넌트가 표시되는지 확인
    cy.get('[data-testid="category-product"]').should('be.visible');
  });

  it('카테고리 변경이 가능해야 함', () => {
    cy.get('[data-testid="category-title"]').click(); // 카테고리 목록 펼치기
    cy.get('[data-testid="category-button"]').first().click(); // 첫 번째 카테고리 선택
  });

  it('더보기 버튼 클릭 시 /products로 이동해야 함', () => {
    // 첫 번째 더보기 버튼 클릭
    cy.get('[data-testid="more-button"]').first().click();
    cy.url().should('include', '/products');

    // 뒤로가기
    cy.go('back');

    // 두 번째 더보기 버튼 클릭
    cy.get('[data-testid="more-button"]').last().click();
    cy.url().should('include', '/products');
  });

  it('상품 클릭 시 상품 상세 페이지로 이동해야 함', () => {
    // 첫 번째 상품 클릭
    cy.get('[data-testid="product-item"]').first().click();
    cy.url().should('match', /\/products\/\d+/);
  });
});
