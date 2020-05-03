
const constraints =  {
    phone: {
        presence: true,
        length: {
            minimum: 14,
            message: "^Please enter a valid phone number"
        }
    }
};

export default constraints;
