use candid::{CandidType, Deserialize};

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Farm {
    pub farm_name: String,
    pub farm_size: String,
    pub crop_types: String,
    pub description: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct User {
    pub user_type: String,         // "farmer" or "consumer"
    pub name: String,
    pub email: String,
    pub phone: String,
    pub wallet_address: String,
    pub address: String,
    pub city: String,
    pub state: String,
    pub zip_code: String,
    pub farm: Option<Farm>,
}
