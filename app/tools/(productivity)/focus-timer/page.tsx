export default function FocusTimer() {
    return (
        <section className="flex justify-between items-center flex-wrap w-full py-10">
            <section className="w-full max-w-md flex justify-center items-center border border-border p-2 rounded-md">
                timer & timer controls
            </section>
            <section className="w-full max-w-md flex justify-center items-center flex-wrap border border-border p-2 rounded-md gap-2">
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
                <div id="preset tiles" className="grid place-content-center size-20 bg-muted-foreground/15 rounded-md hover:bg-muted-foreground/40 cursor-pointer">10</div>
            </section>
        </section>
    );
}
