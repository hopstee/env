<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invitation</title>
</head>
<body>
    <h1>You have been invited!</h1>
    <p>
        You have been invited to the {{ $invitation->accessable->name }} team in {{ $invitation->role->name }} role.
    </p>
    <p>
        Follow the link to confirm invitation:
        <a href="{{ url('/invitations/accept/' . $invitation->token) }}">Confirm invitation</a>
    </p>
    <p>
        This invitation expires at: {{ $invitation->expires_at }}
    </p>
    <p>
        Best wishes Env team!
    </p>
</body>
</html>
