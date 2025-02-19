import EventBus from '../eventBus';

export enum StoreEvents {
    Updated = 'Updated'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Store<State extends Record<string, any>> extends EventBus {
    private state: State = {} as State;

    constructor(defaultState: State) {
        super();

        this.state = defaultState;
        this.set(defaultState);
    }

    public getState() {
        return this.state;
    }

    public set(nextState: Partial<State>) {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
