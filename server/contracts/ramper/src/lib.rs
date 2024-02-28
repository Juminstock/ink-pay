#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
pub mod ramper {
    #[ink(storage)]
    pub struct RamperVariables {
        var: bool
    }

    impl RamperVariables {
        #[ink(constructor)]
        pub fn new(new_var: bool) -> Self {
            Self { var: new_var }
        }

        #[ink(message)]
        pub fn flip(&mut self) {
            self.var = !self.var;
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.var
        }
    }
}
