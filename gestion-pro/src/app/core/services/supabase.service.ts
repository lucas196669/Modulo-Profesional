import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  login(email: string, password: string) {
    return this.client.auth.signInWithPassword({ email, password });
  }

  async emailExists(email: string): Promise<boolean> {
    const { data } = await this.client.rpc('email_exists', { p_email: email });
    return !!data;
  }

  async getRole(userId: string): Promise<'admin' | 'user'> {
    const { data } = await this.client.from('profiles').select('role').eq('id', userId).single();
    return data?.role ?? 'user';
  }

  products() {
    return this.client.from('products').select('*').order('id');
  }

  orders() {
    return this.client.from('orders').select('*, products(name, category)');
  }
}