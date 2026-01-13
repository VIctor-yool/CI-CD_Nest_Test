import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"],
     plugins: { js }, extends: ["js/recommended"],
      languageOptions: { globals: globals.browser },
      rules: {
        // Basic JS rules
        "no-unused-vars": "off", // 사용하지 않는 변수 감지 비활성화 (아래 TypeScript 전용 규칙 사용)
        "eqeqeq": ["error", "always"], // ==, != 대신 ===, !== 강제
        "no-console": "off", // console 사용 허용
        "curly": "error", // 모든 제어문에서 중괄호 사용 강제
        "semi": ["off", "always"], // 세미콜론(;) 필수 아님
        "quotes": ["error", "double"], // 문자열에 쌍따옴표(") 사용 강제
        "no-var": "error", // var 사용 금지 (let, const 사용 권장)
        "prefer-const": "error", // 재할당 안 한다면 const 사용 추천
        "no-undef": "warn", // 선언되지 않은 변수 사용시 경고

        // TypeScript-specific rules
        "@typescript-eslint/no-unused-vars": [
          "error", 
          { "args": "after-used", "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
        ], // 사용하지 않는 변수/매개변수 경고 (단, _로 시작하면 허용)
        "@typescript-eslint/no-unsafe-assignment": "error", // any 타입 할당 제한
        "@typescript-eslint/no-unsafe-call": "error", // any 타입 함수 호출 제한
        "@typescript-eslint/no-unsafe-member-access": "error", // any 타입 객체의 멤버 접근 제한
      }
     },
]);
