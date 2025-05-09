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
                {index === 0 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 1 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 2 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 3 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 4 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 5 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 6 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 7 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 8 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
                {index === 9 && (
                    <>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -left-px -top-px stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -right-px -top-px stroke-muted-foreground opacity-50 rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -left-px -rotate-90 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <svg
                            width="5"
                            height="5"
                            viewBox="0 0 5 5"
                            fill="none"
                            className="absolute -bottom-px -right-px rotate-180 stroke-muted-foreground opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 1V4.5H1V1H4.5V0H1H0V1Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </>
                )}
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
