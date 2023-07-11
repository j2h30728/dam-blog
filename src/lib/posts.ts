import fs from "fs";
import path from "path";
import matter, { GrayMatterFile } from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "__posts");

export interface PostData {
  slug: string;
  [key: string]: any; // Add any additional properties you expect in the front matter
}
export function getPostFileNames() {
  return fs.readdirSync(postsDirectory);
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = getPostFileNames();
  const allPostsData: PostData[] = fileNames.map(fileName => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as GrayMatterFile<string>;
    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((post1, post2) => {
    if (post1.date < post2.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = getPostFileNames();

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents) as GrayMatterFile<string>;

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
