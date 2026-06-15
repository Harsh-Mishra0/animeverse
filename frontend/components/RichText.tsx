import type { RichTextNode } from "@/lib/getPage";

function nodeText(node?: RichTextNode): string {
  return node?.text ?? node?.children?.map((child) => nodeText(child))?.join("") ?? "";
}

export default function RichText({ content }: { content?: RichTextNode[] | string }) {
  if (typeof content === "string") return <p>{content}</p>;
  if (!content?.length) return null;

  return (
    <div className="space-y-4 leading-8 text-white/65">
      {content?.map((node, index) => {
        const text = nodeText(node);
        if (!text) return null;
        if (node?.type === "heading") return <h3 key={index} className="text-2xl font-bold text-white">{text}</h3>;
        if (node?.type === "list") return <p key={index}>{text}</p>;
        return <p key={index}>{text}</p>;
      })}
    </div>
  );
}
