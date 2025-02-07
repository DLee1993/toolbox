import Link from "next/link";

export default function NotFound() {
    return (
        <section className="h-screen flex flex-col justify-center items-center space-y-5">
            <article className="flex space-x-2">
                <h1 className="font-semibold">404 Not Found</h1>
                <p>|</p>
                <p>Could not find requested resource</p>
            </article>
            <Link href="/" className="underline">
                Return Home
            </Link>
        </section>
    );
}
