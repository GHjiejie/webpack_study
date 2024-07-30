您问得很好！在处理聊天消息时，我们通常会为每条新消息创建一个新的文档，而不是更新现有的会话文档，主要有以下几个原因：

**1. 数据一致性和可追溯性：**

*   **独立性:** 每条消息都是一个独立的事件，拥有自己的发送时间、发送者和内容。将其存储为独立的文档可以更好地维护数据的完整性和一致性。
*   **历史记录:**  创建新文档可以方便地追踪每条消息的发送历史，包括编辑历史（如果需要）。如果将所有消息都存储在会话文档中，那么更新消息时可能会丢失之前的版本。
*   **查询效率:**  查询特定时间段内的消息，或者查询某个用户发送的所有消息，都会更加高效。

**2. 性能和并发性：**

*   **并发控制:**  多个用户可能同时发送消息。如果将所有消息存储在同一个会话文档中，就会存在并发更新的问题，需要复杂的锁机制来保证数据一致性。而创建新文档可以避免这种问题，因为每个用户都在操作不同的文档。
*   **数据量:**  随着时间的推移，会话中的消息数量会不断增加。如果将所有消息都存储在同一个文档中，会导致文档体积越来越大，影响查询和更新性能。而创建新文档可以将数据分散存储，提高数据库性能。

**3. 可扩展性：**

*   **消息类型:**  聊天应用通常支持多种消息类型，例如文本、图片、文件等。将每条消息存储为独立的文档，可以更方便地扩展消息类型，只需添加新的字段即可。
*   **消息状态:**  消息可能会有不同的状态，例如已发送、已送达、已读等。将每条消息存储为独立的文档，可以更方便地管理消息状态，只需更新对应文档的字段即可。

**总而言之，为每条新消息创建一个新文档是更合理、更可扩展的设计方案，可以带来更好的数据一致性、性能和可维护性。**