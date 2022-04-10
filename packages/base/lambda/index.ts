import { Callable as event, Default as events } from "./event.js";
import { Callable as context, Default as contexts } from "./context.js";

import type { Event } from "./event.js";
import type { Context } from "./context.js";

const Function = {
    context, event, default: {
        events, contexts
    }
}

export { Function, event, context };
export default { Function, event, context };
export type { Event, Context };
