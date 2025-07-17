use std::cell::RefCell;
use std::collections::HashMap;
use crate::models::{Consumer, Farmer, Produce, ProduceRequest};
use crate::types::User;

thread_local! {
    pub static CONSUMERS: RefCell<HashMap<u64, Consumer>> = RefCell::new(HashMap::new());
    pub static FARMERS: RefCell<HashMap<u64, Farmer>> = RefCell::new(HashMap::new());
    pub static PRODUCE_LIST: RefCell<HashMap<u64, Produce>> = RefCell::new(HashMap::new());
    pub static REQUESTS: RefCell<Vec<ProduceRequest>> = RefCell::new(Vec::new());
        pub static USERS: RefCell<HashMap<String, User>> = RefCell::new(HashMap::new());

}
