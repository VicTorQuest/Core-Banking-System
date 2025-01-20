class User {
    // Static properties
    static totalUsers = 50;

    // constructor for User instances
    constructor(username, id, password, staffStatus = false, dateJoined, lastlogin) {
        this.username = username;
        this.id = id;
        this.password = password;
        this.staffStatus = staffStatus;
        this.dateJoined = dateJoined;
        this.lastlogin = lastlogin;
    }

    // Static method to add a user
    static addUser() {
        User.totalUsers++;
        console.log(`User added successfully, total users: ${User.totalUsers}`);
    }

    // Static method to delete a user
    static deleteUser() {
        User.totalUsers--;
        console.log(`User has been removed, total users: ${User.totalUsers}`);
    }

    // method tp verify login
    verifyLogin(username, password) {
        if (username === this.username && password === this.password) {
            this.lastLogin = new Date(); // Update last login timestamp
            console.log("Login verification successful");
            return true;
        } else {
            console.log("Login failed: Invalid username or password");
            return false;
        }
    }

    // method to change a user's password
    changePassword(oldPassword, newPassword) {
        if (oldPassword == this.password) {
            this.password = newPassword;
            console.log("Password changed successfully");
        } else {
            console.log('invalid password, password change unsuccessful');
        }
        return true;
    }

}



class Account extends User {

    static totalAccounts = 50;



    constructor(username, id, password, staffStatus, dateJoined, lastLogin, firstName, lastName, email, phoneNumber, address, country, state, city, dateOfBirth, gender, active = true, accountNumber, accountBalance = 0.00, transactionPin, totalMoneyIn = 0.00, totalMoneyOut = 0.00) {
        
        super(username, id, password, staffStatus, dateJoined, lastLogin);
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.country = country;
        this.state = state;
        this.city = city;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.active = active;
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
        this.transactionPin = transactionPin;
        this.totalMoneyIn = totalMoneyIn;
        this.totalMoneyOut = totalMoneyOut;
    }

     // Static method to generate account number
    static generateAccountNumber() {
        console.log('Account number generated for new account')
        const timestamp = Date.now();
        return `ACC${timestamp}`;
    }

    // Static method to display total accounts
    static getTotalAccounts() {
        return `Total accounts created: ${Account.totalAccounts}`;
    }


    register(firstName, lastName, email, phoneNumber, address, country, state, city, dateOfBirth, gender, active = true, accountNumber, accountBalance = 0.00, transactionPin, totalMoneyIn = undefined, totalMoneyOut = undefined) {
        console.log('registering Account...')
        this.accountNumber = Account.generateAccountNumber()
        this.dateJoined = new Date(); 
        User.addUser()
        console.log(`Welcome ${firstName} ${lastName}, your account was created successfully on this day ${this.dateJoined}`)
    }

    login(username, password) { 
        if (super.verifyLogin(username, password)) { 
            console.log('Account login was successful'); 
        } else { 
            console.log('Account login failed. Please check your credentials.'); }
         }

         getAccountDetail() { 
            console.log(`Account details for ${this.firstName} ${this.lastName}:`); 
            console.log(`---------------------------------------------`); 
            console.log(`First Name: ${this.firstName}`); 
            console.log(`Last Name: ${this.lastName}`); 
            console.log(`Email: ${this.email}`); 
            console.log(`Phone Number: ${this.phoneNumber}`); 
            console.log(`Address: ${this.address}`); 
            console.log(`Account Balance: $${this.accountBalance.toFixed(2)}`); }

    checkBalance() { 
        console.log(`Your current account balance is $${this.accountBalance.toFixed(2)}`); 
    }

    resetPin(currentPin, newPin) {
        if (currentPin === this.transactionPin) {
            this.transactionPin = newPin
            console.log('Transaction pin has been reset sucessfully')
        } else {
            console.log('Invalid transaction pin')
        }
    }

     // Update account details (example with basic validation)
     updateAccountDetail(details = {}) {
        const allowedUpdates = ['email', 'phoneNumber', 'address'];
        for (let key in details) {
            if (allowedUpdates.includes(key) && details[key]) {
                this[key] = details[key];
                console.log(`${key} has been updated to ${details[key]}`);
            } else {
                console.log(`Cannot update ${key}.`);
            }
        }
    }

    // Transfer funds to another account
    transfer(receiverAccountNumber, amount) {
        if (amount <= 0) {
            console.log('Transfer amount must be greater than zero.');
            return;
        }
        if (amount > this.accountBalance) {
            console.log('Insufficient balance for this transfer.');
            return;
        }
        this.accountBalance -= amount;
        this.totalMoneyOut += amount;
        console.log(`Successfully transferred $${amount.toFixed(2)} to account ${receiverAccountNumber}.`);
        console.log(`Remaining balance: $${this.accountBalance.toFixed(2)}`);
    }

    // Deposit funds into the account
    deposit(amount) {
        if (amount <= 0) {
            console.log('Deposit amount must be greater than zero.');
            return;
        }
        this.accountBalance += amount;
        this.totalMoneyIn += amount;
        console.log(`Successfully deposited $${amount.toFixed(2)}.`);
        console.log(`New account balance: $${this.accountBalance.toFixed(2)}`);
    }

    // Withdraw funds from the account
    withdraw(amount) {
        if (amount <= 0) {
            console.log('Withdrawal amount must be greater than zero.');
            return;
        }
        if (amount > this.accountBalance) {
            console.log('Insufficient balance for this withdrawal.');
            return;
        }
        this.accountBalance -= amount;
        this.totalMoneyOut += amount;
        console.log(`Successfully withdrew $${amount.toFixed(2)}.`);
        console.log(`Remaining balance: $${this.accountBalance.toFixed(2)}`);
    }

}


class Transaction {
    static totalTransactions = 0; // Static property to track total transactions

    constructor(amount, transactionType, currency, bankName, accountName, accountNumber, description, transactionStatus, transactionReferenceNumber, transactionDate) {
        this.amount = amount;
        this.transactionType = transactionType;
        this.currency = currency;
        this.bankName = bankName;
        this.accountName = accountName;
        this.accountNumber = accountNumber;
        this.description = description;
        this.transactionStatus = transactionStatus;
        this.transactionReferenceNumber = transactionReferenceNumber;
        this.transactionDate = transactionDate;

        Transaction.totalTransactions++; // Increment total transactions on creation
    }

    // Class method to get total transactions
    static getTotalTransactions() {
        return `Total Transactions: ${Transaction.totalTransactions}`;
    }

    // Class method to validate transaction details
    static validateTransactionDetails(amount, type) {
        return amount > 0 && (type === "credit" || type === "debit");
    }

    // Initiates a transaction
    initiateTransaction(amount, type, from, to) {
        this.amount = amount;
        this.transactionType = type;
        console.log(`Transaction initiated: ${type} of ${amount} from ${from} to ${to}`);
    }

    // Instance method: Generates a transaction receipt
    generateTransactionReceipt() {
        return `Transaction Receipt:
        Reference Number: ${this.transactionReferenceNumber}
        Amount: ${this.amount}
        Type: ${this.transactionType}
        Date: ${this.transactionDate}`;
    }

    // Instance method: Updates the transaction status
    updateTransactionStatus(status) {
        this.transactionStatus = status;
        console.log(`Transaction status updated to: ${status}`);
    }
}



class Card {
    static totalCardsIssued = 0; // Static property to track total cards issued

    constructor(cardNumber, expiryDate, cvv, cardType) {
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
        this.cardType = cardType;

        Card.totalCardsIssued++; // Increment total cards issued on creation
    }

    // Class method to get total cards issued
    static getTotalCardsIssued() {
        return `Total Cards Issued: ${Card.totalCardsIssued}`;
    }

    // Class method to check if a card is expired
    static isCardExpired(expiryDate) {
        const currentDate = new Date();
        return new Date(expiryDate) < currentDate;
    }

    // Validates a card transaction
    validateTransaction(cardNumber, pin) {
        console.log(`Transaction validated for card ${cardNumber} using PIN.`);
        return true;
    }

    // Instance method: Activates the card
    activateCard() {
        console.log(`Card ${this.cardNumber} activated successfully.`);
    }

    // Instance method: Blocks the card
    blockCard() {
        console.log(`Card ${this.cardNumber} has been blocked.`);
    }
}



class Notification {
    static totalNotificationsSent = 0; // Static property to track total notifications sent

    constructor(id, message, timestamp, read = false) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.read = read;

        Notification.totalNotificationsSent++; // Increment notifications sent on creation
    }

    // Class method to get total notifications sent
    static getTotalNotifications() {
        return `Total Notifications Sent: ${Notification.totalNotificationsSent}`;
    }

    // Class method to filter unread notifications
    static filterUnread(notifications) {
        return notifications.filter(notification => !notification.read);
    }


    // Sends a notification
    static sendNotification(userId, message) {
        console.log(`Notification sent to User ${userId}: ${message}`);
    }

    // Instance method: Marks a notification as read
    markAsRead() {
        if (!this.read) {
            this.read = true;
            console.log(`Notification ${this.id} marked as read.`);
        }
    }

    // Instance method: Displays notification details
    displayNotification() {
        console.log(`Notification ID: ${this.id}\nMessage: ${this.message}\nTimestamp: ${this.timestamp}\nRead: ${this.read}`);
    }
}



class Administrator extends User {
    static totalAdmins = 0; // Static property to track total administrators

    constructor(username, id, password, email, adminName) {
        super(username, id, password, true, new Date(), null); // staffStatus is always true for admin
        this.email = email;
        this.adminName = adminName;

        Administrator.totalAdmins++; // Increment total admins on creation
    }

    // Class method to get total admins
    static getTotalAdmins() {
        return `Total Administrators: ${Administrator.totalAdmins}`;
    }

    // Class method to validate an admin's email
    static validateAdminEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Instance method: Approves a user's KYC (Know Your Customer)
    approveKyc(userId) {
        console.log(`KYC for User ${userId} has been approved.`);
    }

    // Instance method: Generates a system report
    generateSystemReport() {
        console.log("System report generated successfully.");
    }

    // Blocks a user account
    blockAccount(accountNumber) {
        console.log(`Account ${accountNumber} has been blocked.`);
    }

    // Unblocks a user account
    unblockAccount(accountNumber) {
        console.log(`Account ${accountNumber} has been unblocked.`);
    }
}



// Example usage
const user = new User('Quest', 1, '$$WhyNotMe', false)


// User actions
user.verifyLogin('Quest', '$$WhyNotMe')
user.changePassword('$$WhyNotMe', 'newPassword$')

// similating adding and removing a user
User.addUser()
User.deleteUser()



const account = new Account( "Quest2", 2, "securePass123", false, "2025-01-01", null, "Victor", "Okolie", "victorokolie007@gmail.com", "+1234567890", "123 Main St", "Nigeria", "Lagos", "Ikorodu", "1990-01-01", "Male", undefined, "ACC123456", 0.00, "1234", 0.00, 0.00);

account.register("Victor", "Okolie", "victorokolie007@gmail.com", "+1234567890", "123 Main St", "Nigeria", "Lagos", "Ikorodu", "1990-01-01", "Male", undefined, "ACC123456", 0.00, "1234")

account.login('Quest2', 'securePass123')
account.getAccountDetail()
account.checkBalance()
account.deposit(200);
account.withdraw(150);
account.transfer("ACC789101", 500);
account.updateAccountDetail({ email: "new.email@example.com", address: "456 Elm St" });
account.resetPin("1234", "5678");

const transaction = new Transaction(100, "credit", "USD", "Bank of Quest", "Quest codes", "123456", "Payment", "Completed", "TXN001", new Date());
console.log(transaction.generateTransactionReceipt());
console.log(Transaction.getTotalTransactions());

const card = new Card("1234567812345678", "2026-12-31", "123", "debit");
console.log(Card.getTotalCardsIssued());
console.log(Card.isCardExpired("2026-12-31"));

const notification = new Notification(1, "Your account has been updated.", new Date());
notification.displayNotification();
notification.markAsRead();
console.log(Notification.getTotalNotifications());

const admin = new Administrator("Admin1", 101, "securePass", "admin@example.com", "Quest Admin");
console.log(Administrator.getTotalAdmins());
console.log(Administrator.validateAdminEmail("admin@example.com"));
admin.generateSystemReport();
