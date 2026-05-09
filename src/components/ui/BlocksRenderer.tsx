import React from "react";
import type { BlockNode, TextNode, BlocksContent } from "@/types/strapi";

function renderText(node: TextNode): React.ReactNode {
  let content: React.ReactNode = node.text;
  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.code) content = <code>{content}</code>;
  return content;
}

function renderChildren(
  children: Array<BlockNode | TextNode> | undefined
): React.ReactNode {
  return children?.map((child, i) => {
    if (child.type === "text")
      return (
        <React.Fragment key={i}>
          {renderText(child as TextNode)}
        </React.Fragment>
      );
    return (
      <React.Fragment key={i}>
        {renderBlock(child as BlockNode)}
      </React.Fragment>
    );
  });
}

function renderBlock(node: BlockNode): React.ReactNode {
  switch (node.type) {
    case "paragraph":
      return <p>{renderChildren(node.children)}</p>;

    case "heading": {
      const level = node.level ?? 2;
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return <Tag>{renderChildren(node.children)}</Tag>;
    }

    case "list":
      if (node.format === "ordered") {
        return <ol>{renderChildren(node.children)}</ol>;
      }
      return <ul>{renderChildren(node.children)}</ul>;

    case "list-item":
      return <li>{renderChildren(node.children)}</li>;

    case "quote":
      return <blockquote>{renderChildren(node.children)}</blockquote>;

    case "code":
      return (
        <pre>
          <code>{renderChildren(node.children)}</code>
        </pre>
      );

    case "image":
      if (node.image) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={node.image.url}
            alt={node.image.alternativeText ?? ""}
            width={node.image.width}
            height={node.image.height}
          />
        );
      }
      return null;

    case "link":
      return (
        <a href={(node as BlockNode & { url?: string }).url ?? "#"}>
          {renderChildren(node.children)}
        </a>
      );

    default:
      return <>{renderChildren(node.children)}</>;
  }
}

interface Props {
  content: BlocksContent;
  className?: string;
}

export default function BlocksRenderer({ content, className }: Props) {
  if (!content?.length) return null;
  return (
    <div className={className}>
      {content.map((block, i) => (
        <React.Fragment key={i}>
          {renderBlock(block as BlockNode)}
        </React.Fragment>
      ))}
    </div>
  );
}
