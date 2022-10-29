import { NextPage } from 'next'

import { SocialButton } from '~/components/molecule'
import { MainTemplate } from '~/components/template'

const SignIn: NextPage = () => {
  return (
    <MainTemplate title="로그인 / 회원가입" description="NovelAI.APP에 로그인합니다" container>
      <div className="flex items-center justify-center h-full max-w-4xl mx-auto">
        <div className="-mt-20">
          <div className="text-center text-title-color text-4xl font-bold mb-1">로그인</div>
          <div className="text-description-color mb-6">
            소셜 계정으로 로그인하여 다양한 기능을 사용하세요!
          </div>
          <div className="flex flex-col gap-y-2.5 items-center">
            <SocialButton social="kakao" />
            <SocialButton social="discord" />
            <SocialButton social="twitter" />
          </div>
        </div>
      </div>
    </MainTemplate>
  )
}

export default SignIn
