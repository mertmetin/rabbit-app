
const constraints =  {
    signin: {
        phone: {
            presence: true,
            length: {
                minimum: 14,
                message: "^Please enter a valid phone number"
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 4,
                message: "must be at least 4 characters long"
            }
        },
    },
    signup: {
        phone: {
            presence: true,
            length: {
                minimum: 14,
                message: "^Please enter a valid phone number"
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 4,
                message: "must be at least 4 characters long"
            }
        },
        fullName: {
            presence: true,
            length: {
                minimum: 4,
                message: "must be at least 4 characters long"
            }
        },
        email: {
            presence: true,
            email: true
        }
    },
    activation: {
        token: {
            presence: true,
                length: {
                minimum: 4,
                    message: "must be 4 characters long"
            }
        }
    },
    password_reset: {
        phone: {
            presence: true,
            length: {
                minimum: 14,
                message: "^Please enter a valid phone number"
            }
        }
    },
    password_recovery: {
        token: {
            presence: true,
            length: {
                minimum: 4,
                message: "must be 4 characters long"
            }
        },
        password: {
            presence: true,
            length: {
                minimum: 4,
                message: "must be at least 4 characters long"
            }
        }
    }
};

export default constraints;




