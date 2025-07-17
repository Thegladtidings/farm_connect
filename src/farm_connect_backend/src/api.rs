use ic_cdk::{update, query};
use crate::models::*;
use crate::storage::*;

#[update]
pub fn register_consumer(id: u64, name: String, location: String, email: String) -> String {
    let consumer = Consumer { id, name, location, email };
    CONSUMERS.with(|c| c.borrow_mut().insert(id, consumer));
    format!("Consumer {} registered successfully", id)
}

#[update]
pub fn register_farmer(id: u64, name: String, location: String, email: String) -> String {
    let farmer = Farmer { id, name, location, email };
    FARMERS.with(|f| f.borrow_mut().insert(id, farmer));
    format!("Farmer {} registered successfully", id)
}

#[update]
pub fn upload_produce(produce_id: u64, farmer_id: u64, name: String, quantity: u64, price: u64) -> String {
    let produce = Produce { id: produce_id, farmer_id, name, quantity, price };
    PRODUCE_LIST.with(|p| p.borrow_mut().insert(produce_id, produce));
    format!("Produce {} uploaded by Farmer {}", produce_id, farmer_id)
}

#[update]
pub fn request_produce(consumer_id: u64, produce_id: u64) -> String {
    let req = ProduceRequest { consumer_id, produce_id };
    REQUESTS.with(|r| r.borrow_mut().push(req));
    format!("Consumer {} requested produce {}", consumer_id, produce_id)
}

#[query]
pub fn get_consumer(id: u64) -> Option<Consumer> {
    CONSUMERS.with(|c| c.borrow().get(&id).cloned())
}

#[query]
pub fn get_farmer(id: u64) -> Option<Farmer> {
    FARMERS.with(|f| f.borrow().get(&id).cloned())
}

#[query]
pub fn get_produce(id: u64) -> Option<Produce> {
    PRODUCE_LIST.with(|p| p.borrow().get(&id).cloned())
}

#[query]
pub fn list_produce() -> Vec<Produce> {
    PRODUCE_LIST.with(|p| p.borrow().values().cloned().collect())
}

#[query]
pub fn list_requests() -> Vec<ProduceRequest> {
    REQUESTS.with(|r| r.borrow().clone())
}

#[query]
pub fn list_consumers() -> Vec<Consumer> {
    CONSUMERS.with(|c| c.borrow().values().cloned().collect())
}

#[query]
pub fn list_farmers() -> Vec<Farmer> {
    FARMERS.with(|f| f.borrow().values().cloned().collect())
}
