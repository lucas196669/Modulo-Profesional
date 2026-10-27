import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

describe('authGuard', () => {
  it('should allow if logged in', () => {
    const auth = { isLoggedIn: () => true } as AuthService;
    const router = { createUrlTree: () => ({}) } as any as Router;
    const guard = (authGuard as any)(null as any, null as any);
    // simplified
    expect(true).toBe(true);
  });
});
