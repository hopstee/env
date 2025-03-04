<?php

namespace App\Notifications;

use App\Models\Invitation;
use App\Models\Team;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvitationNotifications extends Notification
{
    use Queueable;

    protected $invitation;
    protected $team;

    /**
     * Create a new notification instance.
     */
    public function __construct(Invitation $invitation, Team $team)
    {
        $this->invitation = $invitation;
        $this->team = $team;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $teamName = $this->invitation->accessable->name ?? 'наш сервис';
        $roleName   = $this->invitation->role->name ?? 'пользователь';

        return (new MailMessage)
            ->subject('Invitation to the team!')
            ->line("You have been granted access to the {$teamName} in {$roleName} role.")
            ->action('Go to team', url('/invitations/accept/' . $this->invitation->token));
    }

    public function toDatabase($notifiable)
    {
        $teamName = $this->invitation->accessable->name ?? 'наш сервис';
        $roleName   = $this->invitation->role->name ?? 'пользователь';

        return [
            'team' => $teamName,
            'role' => $roleName,
        ];
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
