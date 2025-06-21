import Link from "next/link";

export default function ToolLink({
    tool,
    index,
}: {
    tool: { [key: string]: string };
    index: number;
}) {
    return (
        <Link href={tool.url} key={index} className="w-fit">
            <div className="group relative flex w-56 h-52 border border-border p-5 hover:bg-muted/50">
                <div className="relative flex flex-1 flex-col items-center justify-start gap-5 translate-y-7 group-hover:translate-y-3 transition-transform duration-300">
                    <h2 className="text-lg font-bold">{tool.title}</h2>
                    <p className="text-center text-sm text-muted-foreground">{tool.description}</p>
                    <div className="h-0 opacity-0 transition-all group-hover:opacity-100 duration-500">
                        <svg
                            width="38"
                            height="38"
                            viewBox="0 0 38 38"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="19.0744"
                                cy="19.2964"
                                r="18.0556"
                                strokeWidth="0.925926"
                                className="stroke-foreground/25"
                            ></circle>
                            <path
                                d="M20.6174 14.4738L25.44 19.2963L20.6174 24.1188M24.8613 19.2963H12.7085"
                                strokeWidth="1.15741"
                                strokeLinecap="square"
                                className="stroke-foreground"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
