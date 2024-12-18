use tauri::{generate_context, Builder};

#[cfg(mobile)]
use tauri::mobile_entry_point;

#[cfg_attr(mobile, mobile_entry_point)]
pub fn run() {
    Builder::default()
        .run(generate_context!())
        .expect("error while running application");
}
