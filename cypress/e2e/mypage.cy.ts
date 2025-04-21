describe('마이페이지 테스트', () => {
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
    cy.get('[data-testid="mypage-link"]').click();
  });

  it('프로필 정보가 표시되어야 함', () => {
    cy.get('.profile-section').should('be.visible');
    cy.get('.user-name').should('be.visible');
    cy.get('.user-email').should('be.visible');
  });

  it('주문 내역이 표시되어야 함', () => {
    cy.get('.order-history').should('be.visible');
    cy.get('.order-item').should('have.length.at.least', 1);
  });

  it('주문 상세 정보 조회가 동작해야 함', () => {
    cy.get('.order-item').first().click();
    cy.url().should('include', '/order/detail');
  });

  it('리뷰 작성이 동작해야 함', () => {
    cy.get('.write-review').first().click();
    cy.get('.review-modal').should('be.visible');
  });

  it('설정 페이지로 이동이 동작해야 함', () => {
    cy.get('.settings-link').click();
    cy.url().should('include', '/settings');
  });
});
