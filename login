<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Online Gas Agency - Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background: #f5f6fa;
            font-family: Arial, sans-serif;
        }
        .login-container {
            max-width: 350px;
            margin: 90px auto;
            padding: 30px 25px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 12px rgba(0,0,0,0.08);
        }
        .login-container h2 {
            text-align: center;
            margin-bottom: 22px;
            color: #444;
        }
        .form-group {
            margin-bottom: 17px;
        }
        .form-group label {
            display: block;
            margin-bottom: 6px;
            color: #333;
        }
        .form-group input {
            width: 100%;
            padding: 9px 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 15px;
        }
        .login-btn {
            width: 100%;
            padding: 10px 0;
            background: #2d8a4d;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        }
        .login-btn:hover {
            background: #246b3a;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Online Gas Agency Login</h2>
        <form>
            <div class="form-group">
                <label for="username">User Name</label>
                <input type="text" id="username" name="username" required autocomplete="username">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required autocomplete="current-password">
            </div>
            <button type="submit" class="login-btn">Login</button>
        </form>
    </div>
</body>
</html>
