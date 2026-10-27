import { Injectable, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User, Role } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  private _role = signal<Role | null>(null);

  user = computed(() => this._user());
  role = computed(() => this._role());
  isLoggedIn = computed(() => !!this._user());

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) {
      const { data: profile } = await this.supabase.client
        .from('profiles')
        .select('role, full_name, email')
        .eq('id', data.user.id)
        .single();
      const role = (profile?.role as Role) || 'user';
      this._user.set({ id: data.user.id, email: data.user.email || profile?.email || '', role, name: profile?.full_name });
      this._role.set(role);
    }
  }

  async logout(): Promise<void> {
    await this.supabase.client.auth.signOut();
    this._user.set(null);
    this._role.set(null);
    this.router.navigate(['/auth/login']);
  }
}
