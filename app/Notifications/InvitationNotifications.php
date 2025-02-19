<?php

namespace App\Notifications;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvitationNotifications extends Notification
{
    use Queueable;

    protected $invitation;

    /**
     * Create a new notification instance.
     */
    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $entityName = $this->invitation->accessable->name ?? 'наш сервис';
        $roleName   = $this->invitation->role->name ?? 'пользователь';

        return (new MailMessage)
            ->subject('Invitation to the team!')
            ->line("=You have been have granted access to the {$entityName} in {$roleName} role.")
            ->action('Go to team', url('/invitations/accept/' . $this->invitation->token));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
