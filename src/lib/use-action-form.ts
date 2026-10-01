"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import type { FormState } from "./types";

/**
 * useActionState wired to onSubmit instead of the form `action` prop, so React doesn't reset the
 * fields after submission and customers keep what they typed when validation fails.
 */
export function useActionForm(action: (prev: FormState, fd: FormData) => Promise<FormState>, initial: FormState = null) {
  const [state, dispatch, pending] = useActionState<FormState, FormData>(action, initial);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => dispatch(data));
  };
  return [state, onSubmit, pending] as const;
}
