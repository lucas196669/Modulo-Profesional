import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async emailExists(pEmail: string): Promise<boolean> {
    const { data, error } = await this.supabase.rpc('email_exists', { p_email: pEmail });
    if (error) {
      return false;
    }
    return !!data;
  }
}
