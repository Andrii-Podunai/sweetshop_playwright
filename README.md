# Sweet Shop Automation Project

## Overview
This project automates the testing of the Sweet Shop website using Playwright and TypeScript. The tests ensure the correct functionality of adding products to the basket, verifying prices, and completing the checkout process.

## Test Cases
1. **Ensure the website is accessible**.
2. **Verify that all selected items are present in the basket**.
3. **Test that the total price in GBP matches the sum of individual items based on quantity**.
4. **Change the delivery type to Standard Shipping and verify the total price**.
5. **Fill in the checkout details and submit the form**.

## CircleCI Configuration
This project uses CircleCI for continuous integration and deployment (CI/CD). The `.circleci/config.yml` file defines the pipeline that runs the build, test, and deployment jobs for different environments (QA, Preprod, and Prod).

## Setup Instructions
1. **Clone the repository**:
   - `git clone <repository-url>`

2. **Install dependencies**:
   - `npm install`

3. **Run tests**:
   - `npm test`

4. **Configure the `.env` file with necessary environment variables**.

## Deployment
The deployment process is handled by CircleCI and runs based on the branch:

- **QA**: Runs on the `develop` branch.
- **Preprod**: Runs on the `preprod` branch.
- **Prod**: Runs on the `main` branch.
