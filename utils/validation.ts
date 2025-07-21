// 이메일 validation
export const emailValidation = (params:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(params)
}

// 비밀번호 validation (6자리 이상)
export const passwordValidation = (params:string) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(params)
}

// 이름 validation (한 글자 이상)
export const nameValidation = (params:string) => {
    return params.trim().length > 0;
}