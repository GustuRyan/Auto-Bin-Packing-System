export interface Placement {
    bin: string
    bin_index: number
    bin_L_cm: number
    bin_W_cm: number
    bin_H_cm: number
    item_id: string
    row_index: number
    orientation_index: number
    dims_lwh_cm: number[]
    l_cm: number
    w_cm: number
    h_cm: number
    x_cm: number
    y_cm: number
    z_cm: number
    weight_kg: number
    days_to_expiry: number
    urgency_1_5: number
    durability: number
}
