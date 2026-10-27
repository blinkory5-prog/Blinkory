import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validatePortfolioUrl,
  validateConsent,
  validateApplication,
  normalizeUrl,
} from './validation.ts';

test('validateFullName handles valid and invalid inputs', () => {
  assert.equal(validateFullName(''), 'Full name is required.');
  assert.equal(validateFullName('   '), 'Full name is required.');
  assert.equal(validateFullName('A'), 'Please enter your full name (minimum 2 characters).');
  assert.equal(validateFullName('Abhay Singh'), null);
  assert.equal(validateFullName('Alex Chen'), null);
});

test('validateEmail checks standard format', () => {
  assert.equal(validateEmail(''), 'Email address is required.');
  assert.equal(validateEmail('invalid-email'), 'Please enter a valid email address (e.g., name@example.com).');
  assert.equal(validateEmail('user@domain'), 'Please enter a valid email address (e.g., name@example.com).');
  assert.equal(validateEmail('animator@example.com'), null);
  assert.equal(validateEmail('test.work+1@sub.domain.co'), null);
});

test('validatePhone checks numbers and country codes', () => {
  assert.equal(validatePhone(''), 'Phone number with country code is required.');
  assert.equal(validatePhone('123'), 'Phone number is too short. Please include your country code.');
  assert.equal(validatePhone('+91 98765 43210'), null);
  assert.equal(validatePhone('+1 (555) 234-5678'), null);
  assert.equal(validatePhone('+44 7911 123456'), null);
  assert.equal(validatePhone('+919876543210'), null);
  assert.equal(validatePhone('9876543210'), null);
});

test('validatePortfolioUrl handles optionality and URLs', () => {
  // Empty or undefined is valid because portfolio is optional
  assert.equal(validatePortfolioUrl(''), null);
  assert.equal(validatePortfolioUrl(undefined), null);
  assert.equal(validatePortfolioUrl('   '), null);

  // Valid links
  assert.equal(validatePortfolioUrl('https://instagram.com/abhay.create'), null);
  assert.equal(validatePortfolioUrl('https://youtube.com/@abhay.create'), null);
  assert.equal(validatePortfolioUrl('behance.net/supercreator'), null);
  assert.equal(validatePortfolioUrl('https://vimeo.com/showcase/12345'), null);
  assert.equal(validatePortfolioUrl('http://myportfolio.art'), null);

  // Invalid links
  assert.notEqual(validatePortfolioUrl('justawordwithnoperiod'), null);
});

test('validateConsent verifies agreement', () => {
  assert.equal(validateConsent(false), 'You must agree to be contacted regarding this opportunity.');
  assert.equal(validateConsent(true), null);
});

test('validateApplication checks full form payload', () => {
  const invalidResult = validateApplication({
    fullName: '',
    phone: '',
    email: 'bademail',
    portfolioUrl: 'invalid link with space and no dot',
    agreedToTerms: false,
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.agreedToTerms);

  const validResult = validateApplication({
    fullName: 'Rahul Sharma',
    phone: '+91 98123 45678',
    email: 'rahul.motion@gmail.com',
    portfolioUrl: 'https://behance.net/rahulmotion',
    agreedToTerms: true,
  });
  assert.equal(validResult.isValid, true);
  assert.deepEqual(validResult.errors, {});

  // Valid without optional portfolio
  const validNoPortfolio = validateApplication({
    fullName: 'Sara Miller',
    phone: '+1 (415) 555-0199',
    email: 'sara.anim@gmail.com',
    portfolioUrl: '',
    agreedToTerms: true,
  });
  assert.equal(validNoPortfolio.isValid, true);
});

test('normalizeUrl prepends https where needed', () => {
  assert.equal(normalizeUrl(''), '');
  assert.equal(normalizeUrl('instagram.com/abhay'), 'https://instagram.com/abhay');
  assert.equal(normalizeUrl('https://instagram.com/abhay'), 'https://instagram.com/abhay');
});
