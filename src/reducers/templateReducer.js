export function templates(state = [], action) {
  switch (action.type) {
    case 'TEMPLATE_FETCH_DATA_SUCCESS':
        return action.templates;

    default:
        return state;
  }
}

