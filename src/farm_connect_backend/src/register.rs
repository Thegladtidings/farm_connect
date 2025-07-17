use crate::types::{User, Farm};
use crate::storage::USERS;

#[ic_cdk::update]
pub fn register_user(
    wallet_address: String,
    user_type: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zip_code: String,
    farm_name: Option<String>,
    farm_size: Option<String>,
    crop_types: Option<String>,
    description: Option<String>,
) -> Result<String, String> {
    // Basic validation
    if user_type != "farmer" && user_type != "consumer" {
        return Err("Invalid user type. Must be 'farmer' or 'consumer'.".to_string());
    }

    USERS.with(|users| {
        let mut users = users.borrow_mut();

        if users.contains_key(&wallet_address) {
            return Err("Wallet address already registered.".to_string());
        }

        let farm = if user_type == "farmer" {
            // Ensure all farm fields are present
            match (farm_name, farm_size, crop_types, description) {
                (Some(farm_name), Some(farm_size), Some(crop_types), Some(description)) => {
                    Some(Farm {
                        farm_name,
                        farm_size,
                        crop_types,
                        description,
                    })
                }
                _ => return Err("Missing farm details for farmer registration.".to_string()),
            }
        } else {
            None
        };

        let user = User {
            user_type,
            name,
            email,
            phone,
            wallet_address: wallet_address.clone(),
            address,
            city,
            state,
            zip_code,
            farm,
        };

        users.insert(wallet_address, user);
        Ok("User registered successfully.".to_string())
    })
}
