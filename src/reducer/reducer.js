import * as type from '../action/action';

const INITIAL = {
    users: [],
    questions: [],
    question: {},
    user: '',
    username: '',
    loader: false,
    authorizeUser: false
};

export default (state = INITIAL, action) => {
    switch (action.type) {

        case type.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.model.user,
                username: action.model.username,
                authorizeUser: true
            };

        case type.GET_USERS:
            return {
                ...state,
                users: action.model
            };

        case type.GET_QUESTIONS:
            return {
                ...state,
                questions: action.model
            };

        case type.SET_QUESTION:
            return {
                ...state,
                question: action.model
            };

        case type.ADD_QUESTION:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.model.author]: {
                        ...state.users[action.model.author],
                        questions: state.users[action.model.author].questions.concat([action.model.id])
                    }
                },
                questions: {
                    ...state.questions,
                    [action.model.id]: action.model
                }
            }

        case type.SUMBIT_ANSWER:
            let { authedUser, qid, answer,resetQuestion } = action.model;
            return {
                ...state,
                users: {
                    ...state.users,
                    [authedUser]: {
                        ...state.users[authedUser],
                        answers: {
                            ...state.users[authedUser].answers,
                            [qid]: answer
                        }
                    }
                },
                questions: {
                    ...state.questions,
                    [qid]: {
                        ...state.questions[qid],
                        [answer]: {
                            ...state.questions[qid][answer],
                            votes: state.questions[qid][answer].votes.concat([authedUser])
                        }
                    }
                },
                question:resetQuestion
            };

        case type.SHOW_LOADER:
            return {
                ...state,
                loader: true
            };

        case type.HIDE_LOADER:
            return {
                ...state,
                loader: false
            };

        case type.LOGOUT_SUCCESS:
            return {
                ...state,
                users: [],
                user: '',
                username: '',
                authorizeUser: false
            };

        default:
            return state;
    }
}