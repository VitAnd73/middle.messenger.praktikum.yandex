import { AppState } from "../../types";
import Block from "../block";
import { Class } from "../../types";
import { StoreEvents } from "./store";
import { isEqualPlainObjects } from "../../utils/utils";

export function connect(mapStateToProps: (state: AppState) => Partial<AppState>) {
    return function<P extends object>(Component: Class<Block>) {
        return class extends Component{
            private onChangeStoreCallback: () => void;
            constructor(props: P) {
                const store = window.store;
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({...props, ...state});

                this.onChangeStoreCallback = () => {

                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqualPlainObjects(state, newState)) {
                    this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                }

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }


            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        }
    }
}
