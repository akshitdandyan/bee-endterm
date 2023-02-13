import { Component, createSignal, Show } from "solid-js";
import { For } from "solid-js";

type Props = {
    options: { key: string | number; value: string | number }[];
    onChange: (value: string | number) => void;
    defaultValue?: string | number;
};

const Dropdown: Component<Props> = (props) => {
    const [show, setShow] = createSignal(false);
    const [selected, setSelected] = createSignal<string | number>(
        props.defaultValue
    );
    return (
        <div class="text-blue-600 relative">
            <div
                class="bg-gray-100 p-3 text-sm rounded-full cursor-pointer  border-2 border-gray-100 hover:bg-white"
                onclick={() => setShow(true)}
            >
                {selected()}
            </div>
            <Show when={show()}>
                <div class="absolute bg-gray-50 rounded-sm left-2 z-10">
                    <For each={props.options}>
                        {(option) => (
                            <div
                                class="p-2 text-sm cursor-pointer hover:bg-gray-100 hover:shadow-md active:shadow-none duration-100 "
                                onClick={() => {
                                    props.onChange(option.value);
                                    setSelected(option.value);
                                    setShow(false);
                                }}
                            >
                                {option.key}
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};

export default Dropdown;
