import logoActionScript from './ActionScript/logo';
import pingpongActionScript from './ActionScript/pingpong';
import type { ActionScriptFactory } from './types';

export type { ActionScriptFactory } from './types';

const actionScriptRegistry = {
  pingpong: pingpongActionScript,
  logo: logoActionScript,
} as const satisfies Record<string, ActionScriptFactory>;

export function getActionScript(movieName: string): ActionScriptFactory | undefined {
  return actionScriptRegistry[movieName as keyof typeof actionScriptRegistry];
}

export const actionScripts = actionScriptRegistry;
