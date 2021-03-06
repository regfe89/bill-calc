const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CHECK":
      // const remappedChecks = JSON.parse(JSON.stringify(state.checks));

      const remappedChecks = state.checks.map((check, checkIndex) => {
        if (checkIndex === state.checkId - 1) {
          return {
            ...check,
            members: [...check.members]
          };
        }
        return check;
      });
      remappedChecks.push({
        date: new Date(),
        id: state.checkId,
        members: action.check
      });
      return {
        ...state,
        checks: remappedChecks,
        checkId: state.checkId + 1,
        memberId: 1,
        // memberId: state.memberId +1
      };

    case "ADD_MEMBER":
      const remappedMembers = state.checks.map((check, checkIndex) => {
        if (checkIndex === state.checkId - 1) {
          return {
            ...check,
            members: [
              ...check.members,
              {
                dish: action.member,
                memberId: state.memberId
              }
            ]
          };
        }
        return check;
      });

      return {
        ...state,
        memberId: state.memberId + 1,
        checks: remappedMembers
      };

    case 'ADD_DISH':
    const remappedDishes = state.checks.map((check, checkIndex) => {
      if (checkIndex === state.checkId - 1) {
        const remappedDishesInternal = state.checks[checkIndex].members.map((member, memberIndex) => {
          if (memberIndex === state.memberId-1) {
            return {
              ...member,
              dish: action.dish
            }
          }
        });
        return {
          ...check,
          members: remappedDishesInternal
        };
      }
      return check;
    });

    return {
      ...state,
      dishId: state.dishId + 1,
      checks: remappedDishes
    };
  }
  return state;
};

export default reducer;
