jest.mock('nanoid', () => {
    return {
        nanoid: () => Math.random().toString(),
    };
});
