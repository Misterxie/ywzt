

const authority = {
    state: {
        authority_btn: [],
    },
    mutations: {
        setAuthorityBtn(state,object){
            state.authority_btn.push(object);
        }
    },
};

export default authority;
