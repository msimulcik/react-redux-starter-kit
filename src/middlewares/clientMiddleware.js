export default function clientMiddleware(client) {
  return () => next => action => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({
      type: REQUEST,
      payload: {
        ...rest,
      },
    });

    const actionPromise = promise(client);
    actionPromise.then(
      (result) => next({
        type: SUCCESS,
        payload: result,
        meta: {
          ...rest,
        },
      })
    ).catch(
      (error) => next({
        type: FAILURE,
        error,
        meta: {
          ...rest,
        },
      }),
    );

    return actionPromise;
  };
}
