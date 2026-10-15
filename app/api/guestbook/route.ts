import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { INITIAL_GUESTBOOK } from '@/lib/data';

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ data: INITIAL_GUESTBOOK, source: 'fallback' });
  }

  try {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ data: INITIAL_GUESTBOOK, error: error.message }, { status: 200 });
    }

    return NextResponse.json({ data: data || INITIAL_GUESTBOOK, source: 'supabase' });
  } catch (err: any) {
    return NextResponse.json({ data: INITIAL_GUESTBOOK, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, email, avatar_url } = body;

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json({
        data: {
          id: 'temp-' + Date.now(),
          name,
          message,
          avatar_url: avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          created_at: new Date().toISOString(),
        },
        warning: 'Supabase client is unconfigured; saved in memory only.'
      });
    }

    const { data, error } = await supabase
      .from('guestbook')
      .insert([
        {
          name,
          message,
          email: email || null,
          avatar_url: avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data: data[0] }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
