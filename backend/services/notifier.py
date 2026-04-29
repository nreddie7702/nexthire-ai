from sqlalchemy.orm import Session
from db.models import Notification

def send_notification(user_id: int, db: Session, notif_type: str, message: str):
    """
    Creates an in-app notification and optionally triggers an external web hook (Telegram/Email).
    """
    new_notif = Notification(
        user_id=user_id,
        type=notif_type,
        message=message
    )
    db.add(new_notif)
    db.commit()
    db.refresh(new_notif)
    
    # Trigger external notifications
    trigger_telegram_bot(user_id, message)
    trigger_email_notification(user_id, message)
    
    return new_notif

def trigger_telegram_bot(user_id: int, message: str):
    """
    Integration for python-telegram-bot or requests to Telegram API goes here.
    """
    # MOCK Telegram Bot
    print(f"[TELEGRAM] Sent to User {user_id}: {message}")

def trigger_email_notification(user_id: int, message: str):
    """
    Integration for SendGrid or Amazon SES goes here.
    """
    # MOCK Email
    print(f"[EMAIL] Sent to User {user_id}: {message}")
