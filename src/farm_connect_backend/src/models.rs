use candid::CandidType;
use serde::Deserialize;

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Consumer {
    pub id: u64,
    pub name: String,
    pub location: String,
    pub email: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Farmer {
    pub id: u64,
    pub name: String,
    pub location: String,
    pub email: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Produce {
    pub id: u64,
    pub farmer_id: u64,
    pub name: String,
    pub quantity: u64,
    pub price: u64,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct ProduceRequest {
    pub consumer_id: u64,
    pub produce_id: u64,
}
