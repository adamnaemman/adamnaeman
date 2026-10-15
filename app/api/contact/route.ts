import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({
        success: true,
        message: 'Message received (Demo mode: Supabase not configured).'
      });
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          subject: subject || 'Portfolio Inquiry',
          message,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
