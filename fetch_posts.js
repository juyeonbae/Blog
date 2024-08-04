import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import Parser from 'rss-parser';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';
import path from 'path';
import { execSync } from 'child_process';

// README.md 파일에 쓸 고정된 초기 텍스트 설정
let text = `
# 티스토리 글 깃허브로 자동 연동하기

이 프로젝트는 티스토리 블로그와 GitHub를 연동하여 최신 블로그 포스트를 README.md 파일에 자동으로 업데이트합니다.

## 프로젝트 구조

- posts/
  - [카테고리1]/
    - [포스트 제목1].md
    - [포스트 제목2].md
  - [카테고리2]/
    - [포스트 제목1].md
    - [포스트 제목2].md
- README.md

## 📕 Latest Blog Posts

`;

// rss-parser 설정
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

// Turndown 서비스 설정
const turndownService = new TurndownService();

// 비동기 함수 실행
(async () => {
    // Tistory RSS 피드 가져오기
    const feed = await parser.parseURL('https://zo0oz.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 text 변수에 추가
    for (let i = 0; i < 5 && i < feed.items.length; i++) {
        const { title, link } = feed.items[i];
        text += `<a href="${link}">${title}</a></br>`;
    }

    // 전체 포스트를 가져와서 Markdown 파일로 저장
    for (let i = 0; i < feed.items.length; i++) {
        const { title, link, categories } = feed.items[i];

        try {
            // 포스트의 HTML 가져오기
            const response = await axios.get(link);
            const dom = new JSDOM(response.data);

            // 포스트 내용을 가져오기 위한 선택자
            const articleElement = dom.window.document.querySelector('.tt_article_useless_p_margin.contents_style');

            if (articleElement) {
                const content = articleElement.innerHTML;
                const markdown = turndownService.turndown(content);

                // 카테고리별 디렉토리 생성
                const category = categories && categories.length > 0 ? categories[0] : 'Uncategorized';
                const categoryDir = path.join('posts', category);
                if (!existsSync(categoryDir)) {
                    mkdirSync(categoryDir, { recursive: true });
                }

                // 제목에 특수문자 제거 및 파일명 생성
                const sanitizedTitle = title.replace(/[<>:"\/\\|?*]+/g, '');
                const filePath = path.join(categoryDir, `${sanitizedTitle}.md`);
                
                // Markdown 파일로 저장
                writeFileSync(filePath, markdown, 'utf8');
                console.log(`Saved post: ${filePath}`);
            } else {
                console.error(`Article content not found for link: ${link}`);
            }
        } catch (error) {
            console.error(`Failed to fetch or process article at link: ${link}`, error);
        }
    }

    // README.md 파일에 텍스트 쓰기
    writeFileSync('README.md', text, 'utf8', (e) => {
        if (e) console.log(e);
    });

    console.log('업데이트 완료');

    // Git 상태 확인 및 변경 사항 커밋
    try {
        const gitStatus = execSync('git status').toString();
        console.log(gitStatus);

        if (!gitStatus.includes('nothing to commit')) {
            execSync('git add .');
            execSync('git commit -m "Update README and Fetch Blog Posts"');
            execSync('git push');
        } else {
            console.log('No changes to commit');
        }
    } catch (e) {
        console.error('Failed to commit changes', e);
    }
})();
