#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod ramper {
    use ink::primitives::AccountId;

    #[ink(storage)]
    pub struct Ramper {
        seller: AccountId,
        buyer: AccountId,
        amount_to_send_seller: balance,
        amount_to_send_buyer: balance,
        max_and_min: Vec<u32>,
        zk_contract: AccountId,
        zk_proof_buyer: Vec<u32>,
        user_manager_contract: AccountId
    }

    impl Ramper {
        #[ink(constructor)]
        pub fn new_sales() -> Self {}

        #[ink(message)]
        pub fn create_sales(
            &mut self,
            new_seller: AccountId,
            new_amount_to_send_seller: balance,
            new_max_and_min: Vec<u32>,
            new_zk_contract: AccountId,
            new_user_manager_contract: AccountId
        ) {}
    }
}
