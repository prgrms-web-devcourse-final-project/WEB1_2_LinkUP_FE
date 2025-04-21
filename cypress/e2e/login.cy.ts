describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/signin');
  });

  it('로그인 페이지가 정상적으로 로드되어야 함', () => {
    cy.get('input[placeholder="이메일 입력"]').should('be.visible');
    cy.get(
      'input[placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"]'
    ).should('be.visible');
    cy.contains('Login').should('be.visible');
  });

  it('이메일과 비밀번호를 입력하고 로그인 버튼을 클릭할 수 있어야 함', () => {
    const email = 'test12@test.test';
    const password = 'Test1234!';

    cy.get('input[placeholder="이메일 입력"]').type(email);
    cy.get(
      'input[placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"]'
    ).type(password);
    cy.contains('Login').click();
  });

  it('비밀번호 유효성 검사가 정상적으로 동작해야 함', () => {
    const invalidPassword = 'test123';

    cy.get(
      'input[placeholder="비밀번호 입력 (영문 대/소문자, 숫자, 특수문자 포함 8-16자)"]'
    )
      .type(invalidPassword)
      .blur();

    cy.contains(
      '비밀번호는 영문 대/소문자, 숫자, 특수문자를 포함한 8-16자여야 합니다.'
    ).should('be.visible');
  });

  it('회원가입 페이지로 이동할 수 있어야 함', () => {
    cy.contains('회원가입 하기').click();
    cy.url().should('include', '/signup');
  });

  it('비밀번호 찾기 페이지로 이동할 수 있어야 함', () => {
    cy.contains('비밀번호 찾기').click();
    cy.url().should('include', '/findpassword');
  });

  it('네이버 로그인 버튼이 정상적으로 동작해야 함', () => {
    cy.contains('계정으로 로그인').click();
    // 네이버 로그인 페이지로 리다이렉트되는지 확인
    cy.url().should('include', 'naver');
  });
});
