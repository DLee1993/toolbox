// Get an id for the note
export const GetRandomID = () => {
    const id = crypto.randomUUID();
    return id.slice(0, 6);
};
